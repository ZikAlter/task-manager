import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskService } from "../services/task.service";
import { ITask } from "../types/task.interface";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import { RiFileDownloadLine, RiCloseLine } from "react-icons/ri";
import { useUser } from "../hooks/useUser";

const TaskPage: FC = () => {
    const { id } = useParams();
    const [task, setTask] = useState<ITask | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const [statusLoading, setStatusLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        titleTask: '',
        endedAt: '',
        importance: '',
        descript: '',
        contractorId: ''
    });
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (id) {
            loadTask();
        }
    }, [id]);

    useEffect(() => {
        if (task && isEditModalOpen) {
            setEditFormData({
                titleTask: task.titleTask,
                endedAt: new Date(task.endedAt).toISOString().slice(0, 16),
                importance: task.importance,
                descript: task.descript,
                contractorId: task.contractor.id.toString()
            });
        }
    }, [task, isEditModalOpen]);

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

    const handleToggleStatus = async () => {
        if (!task) return;
        setStatusLoading(true);
        try {
            const newStatus = task.result === 'В работе' ? 'Выполнено' : 'В работе';
            await TaskService.updateStatus(task.id, newStatus);
            setTask({ ...task, result: newStatus });
            toast.success(`Статус задачи изменён на "${newStatus}"`);
        } catch (error) {
            toast.error('Не удалось изменить статус задачи');
        } finally {
            setStatusLoading(false);
        }
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!task) return;

        setSaveLoading(true);
        try {
            const updatedTask = await TaskService.update(task.id, {
                titleTask: editFormData.titleTask,
                endedAt: editFormData.endedAt,
                importance: editFormData.importance,
                descript: editFormData.descript,
                contractorId: Number(editFormData.contractorId)
            });
            setTask(updatedTask);
            setIsEditModalOpen(false);
            toast.success('Задача успешно обновлена');
        } catch (error) {
            toast.error('Не удалось обновить задачу');
        } finally {
            setSaveLoading(false);
        }
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
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

    const isAuthor = user && user.id === task.user.id;
    const isExecutor = user && user.id === task.contractor.id;

    return (
        <div className="container px-4 md:px-0">
            <h1 className="mt-4 mb-4 text-2xl md:text-4xl font-bold text-blue-600">Задача №{task.id}</h1>
            <div className="w-full shadow-xl rounded-2xl bg-white p-4 md:p-8 m-0 md:m-4 text-gray-500">
                <h2 className="mt-2 mb-2 text-lg md:text-2xl font-bold text-blue-600 break-words">Наименование задачи: {task.titleTask}</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
                    {isAuthor && (
                        <button
                            className="text-white py-2 md:py-1 px-3 text-sm md:text-base bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700 disabled:opacity-60"
                            onClick={handleToggleStatus}
                            disabled={statusLoading}
                        >
                            {task.result === 'В работе' ? 'Закрыть задачу' : 'Возобновить задачу'}
                        </button>
                    )}
                    {isAuthor && (
                        <button
                            className="text-white py-2 md:py-1 px-3 text-sm md:text-base bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            Отредактировать задачу
                        </button>
                    )}
                </div>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
                    <div className="w-full lg:basis-1/2">
                        <p className="text-sm md:text-base mb-2">Статус: <span className="font-bold">{task.result}</span></p>
                        <p className="text-sm md:text-base mb-2">Крайний срок: <span className="font-bold">{dateFormat(task.endedAt, "dd.mm.yyyy HH:MM")}</span></p>
                        <p className="text-sm md:text-base mb-2">Степень срочности задачи: <span className={`font-bold ${task.importance === 'Срочно' ? 'text-rose-600' : task.importance === 'Средняя' ? 'text-orange-600' : ''}`}>{task.importance === 'Срочно' ? '🔥 ' : ''}{task.importance}</span></p>
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
            {(isAuthor || isExecutor) && (
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
            )}

            {/* Модальное окно редактирования */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl md:text-2xl font-bold text-blue-600">Редактировать задачу</h2>
                            <button
                                onClick={closeModal}
                                className="text-red-400 hover:text-red-600 transition-colors"
                            >
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6">
                            <div className="space-y-4">
                                {/* Наименование задачи */}
                                <div>
                                    <label htmlFor="titleTask" className="block text-sm font-medium text-gray-700 mb-2">
                                        Наименование задачи
                                    </label>
                                    <input
                                        type="text"
                                        id="titleTask"
                                        name="titleTask"
                                        value={editFormData.titleTask}
                                        onChange={handleEditFormChange}
                                        className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 outline-blue-500 text-sm md:text-base"
                                        placeholder="Введите наименование задачи"
                                        required
                                    />
                                </div>

                                {/* Крайний срок */}
                                <div>
                                    <label htmlFor="endedAt" className="block text-sm font-medium text-gray-700 mb-2">
                                        Крайний срок
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="endedAt"
                                        name="endedAt"
                                        value={editFormData.endedAt}
                                        onChange={handleEditFormChange}
                                        className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 outline-blue-500 text-sm md:text-base"
                                        required
                                    />
                                </div>

                                {/* Степень срочности */}
                                <div>
                                    <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-2">
                                        Степень срочности
                                    </label>
                                    <select
                                        id="importance"
                                        name="importance"
                                        value={editFormData.importance}
                                        onChange={handleEditFormChange}
                                        className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 outline-blue-500 text-sm md:text-base"
                                        required
                                    >
                                        <option value="">Выберите срочность</option>
                                        <option value="Обычная">Обычная</option>
                                        <option value="Средняя">Средняя</option>
                                        <option value="Срочно">Срочно</option>
                                    </select>
                                </div>

                                {/* Исполнитель */}
                                <div>
                                    <label htmlFor="contractorId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Исполнитель
                                    </label>
                                    <select
                                        id="contractorId"
                                        name="contractorId"
                                        value={editFormData.contractorId}
                                        onChange={handleEditFormChange}
                                        className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 outline-blue-500 text-sm md:text-base"
                                        required
                                    >
                                        <option value="">Выберите исполнителя</option>
                                        {/* Здесь должен быть список доступных исполнителей */}
                                        {/* Пока оставляю текущего исполнителя */}
                                        <option value={task.contractor.id}>
                                            {`${task.contractor.surname} ${task.contractor.firstName} ${task.contractor.patronymic}`}
                                        </option>
                                    </select>
                                </div>

                                {/* Описание задачи */}
                                <div>
                                    <label htmlFor="descript" className="block text-sm font-medium text-gray-700 mb-2">
                                        Описание задачи
                                    </label>
                                    <textarea
                                        id="descript"
                                        name="descript"
                                        value={editFormData.descript}
                                        onChange={handleEditFormChange}
                                        rows={6}
                                        className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 outline-blue-500 text-sm md:text-base resize-none"
                                        placeholder="Введите описание задачи"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Кнопки действий */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={saveLoading}
                                    className="flex-1 text-white py-3 px-4 rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm md:text-base bg-green-600 hover:bg-green-700 shadow-green-400/90"
                                >
                                    {saveLoading ? 'Сохранение...' : 'Сохранить изменения'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 text-white py-3 px-4 rounded-xl transition-colors text-sm md:text-base shadow-lg bg-red-600 hover:bg-red-700 shadow-red-400/90"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;