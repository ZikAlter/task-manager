import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskService } from "../services/task.service";
import { ITask } from "../types/task.interface";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import { RiFileDownloadLine } from "react-icons/ri";

const TaskPage: FC = () => {
    const { id } = useParams();
    const [task, setTask] = useState<ITask | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadTask();
        }
    }, [id]);

    const loadTask = async () => {
        try {
            const data = await TaskService.getOne(Number(id));
            setTask(data);
        } catch (error) {
            console.error('Ошибка при загрузке задачи:', error);
            toast.error('Не удалось загрузить данные задачи');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl text-red-600">Задача не найдена</h1>
            </div>
        );
    }

    return (
        <div className="container px-4 md:px-0">
            <h1 className="mt-4 mb-4 text-2xl md:text-4xl font-bold text-blue-600">Задача №{task.id}</h1>
            <div className="w-full shadow-xl rounded-2xl bg-white p-4 md:p-8 m-0 md:m-4 text-gray-500">
                <h2 className="mt-2 mb-2 text-lg md:text-2xl font-bold text-blue-600 break-words">Наименование задачи: {task.titleTask}</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
                    <button
                        className="text-white py-2 md:py-1 px-3 text-sm md:text-base bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700">
                        Закрыть задачу
                    </button>
                    <button
                        className="text-white py-2 md:py-1 px-3 text-sm md:text-base bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700">
                        Отредактировать задачу
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
                    <div className="w-full lg:basis-1/2">
                        <p className="text-sm md:text-base mb-2">Статус: <span className="font-bold">{task.result}</span></p>
                        <p className="text-sm md:text-base mb-2">Крайний срок: <span className="font-bold">{dateFormat(task.endedAt, "dd.mm.yyyy HH:MM")}</span></p>
                        <p className="text-sm md:text-base mb-2">Степень срочности задачи: <span className={`font-bold ${task.importance === 'Срочно' ? 'text-rose-600' : task.importance === 'Средняя' ? 'text-orange-600' : ''}`}>
                    {task.importance === 'Срочно' ? '🔥 ' : ''}{task.importance}
                </span></p>
                    </div>
                    <div className="w-full lg:basis-1/2">
                        <p className="font-bold text-sm md:text-base mb-2">Дополнительная информация:</p>
                        <p className="text-sm md:text-base mb-1">Дата создания: {dateFormat(task.createdAt, "dd.mm.yyyy HH:MM")}</p>
                        <p className="text-sm md:text-base mb-1 break-words">Автор задачи: {`${task.user.surname} ${task.user.firstName} ${task.user.patronymic}`}</p>
                        <p className="text-sm md:text-base mb-1 break-words">Исполнитель: {`${task.contractor.surname} ${task.contractor.firstName} ${task.contractor.patronymic}`}</p>
                    </div>
                </div>
                <p className="font-bold text-sm md:text-base mt-4 mb-2">Описание задачи:</p>
                <p className="text-sm md:text-base break-words">{task.descript}</p>
            </div>
            <h2 className="mt-4 mb-4 text-xl md:text-3xl font-bold text-blue-600 ml-0 md:ml-4">Обсуждение</h2>
            <div className="w-full shadow-xl rounded-2xl bg-white p-4 md:p-8 m-0 md:m-4 text-gray-500">
                <h2 className="mt-2 mb-2 text-lg md:text-xl font-bold text-blue-600 break-words">Сидоров Петр Аркадьевич (исполнитель)</h2>
                <p className="text-sm md:text-base mb-3 break-words">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, nemo, quas. Ex facere ipsam iure modi praesentium quas quod! A ab corporis dolorem fuga ipsa itaque obcaecati praesentium quisquam soluta.</p>
                <p className="font-bold text-sm md:text-base mb-2">Вложение:</p>
                <a href="/путь/к/файлу.pdf" download="новое_имя.pdf" className="inline-block mb-2">
                    <RiFileDownloadLine size={32} className="md:w-10 md:h-10" />
                </a>
                <p className="font-bold text-xs md:text-sm">20.07.2023 15:00</p>
            </div>
            <form className="flex flex-col w-full max-w-[600px] lg:w-[600px] h-fit shadow-xl rounded-2xl bg-white m-0 md:m-4 p-4 md:p-8 mt-6 md:mt-8 mx-auto lg:mx-0">
                <h2 className="block font-bold text-blue-600 text-lg md:text-2xl mb-3">Предоставить решение</h2>
                <textarea
                    name="description"
                    id="description"
                    cols={20}
                    rows={5}
                    className="mt-0 md:mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 text-sm md:text-base resize-none"
                    placeholder="Комментарий"
                />
                <input
                    type="file"
                    className="mt-3 py-2 md:py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500 text-sm md:text-base"
                    id="input"
                    multiple
                />
                <button
                    type="submit"
                    className="text-white py-3 md:py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-4 md:mt-6 text-sm md:text-base">
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default TaskPage;