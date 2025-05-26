import {FC} from "react";
import { RiFileDownloadLine } from "react-icons/ri";


const Statistic: FC = () => {
    return (
        <div className="container">
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600">Задача №1</h1>
            <div className="w-full shadow-xl rounded-2xl bg-white p-8 m-4 text-gray-500">
                <h2 className="mt-2 mb-2 text-2xl font-bold text-blue-600">Наименование задачи: Сдать отчет</h2>
                <button
                    className="text-white py-1 px-3 bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700 mt-1 mb-3">
                    Закрыть задачу
                </button>
                <button
                    className="text-white py-1 px-3 bg-blue-600 rounded-md shadow-lg shadow-blue-400/80 hover:bg-blue-700 mt-1 mb-3 ml-3">
                    Отредактировать задачу
                </button>
                <div className="flex flex-row">
                    <div className="basis-1/2">
                        <p>Статус: <span className="font-bold">В работе</span></p>
                        <p>Крайний срок: <span className="font-bold">25.07.2023 15:00</span></p>
                        <p>Степень срочности задачи: <span className="text-rose-600 font-bold">🔥 Срочно</span></p>
                    </div>
                    <div className="basis-1/2">
                        <p className="font-bold">Дополнительная информация:</p>
                        <p>Дата создания: 13.07.2023 12:03</p>
                        <p>Автор задачи: Ivanov Ivan Ivanovich</p>
                        <p>Исполнитель: Сидоров Петр Аркадьевич</p>
                    </div>
                </div>
                <p className="font-bold">Описание задачи:</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, nemo, quas. Ex facere ipsam iure modi
                    praesentium quas quod! A ab corporis dolorem fuga ipsa itaque obcaecati praesentium quisquam
                    soluta.</p>
            </div>
            <h2 className="mt-4 mb-4 text-3xl font-bold text-blue-600 ml-4">Обсуждение</h2>
            <div className="w-full shadow-xl rounded-2xl bg-white p-8 m-4 text-gray-500">
                <h2 className="mt-2 mb-2 text-xl font-bold text-blue-600">Сидоров Петр Аркадьевич (исполнитель)</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, nemo, quas. Ex facere ipsam iure modi praesentium quas quod! A ab corporis dolorem fuga ipsa itaque obcaecati praesentium quisquam soluta.</p>
                <p className="font-bold">Вложение:</p>
                <a href="/путь/к/файлу.pdf" download="новое_имя.pdf"><RiFileDownloadLine size={40} /></a>
                <p className="font-bold mt-2 text-sm">20.07.2023 15:00</p>
            </div>
            <form
                className="flex flex-col w-[600px] h-fit shadow-xl rounded-2xl bg-white m-4 p-8 mt-8">
                <h2 className="block font-bold text-blue-600 text-2xl">Предоставить решение</h2>
                <textarea
                    name="description"
                    id="description"
                    cols={20}
                    rows={5}
                    className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500"
                >
                    Комментарий
                </textarea>
                <input type="file" className="mt-3 py-3 shadow-md border-2 rounded-xl pl-2 bg-gray-50 outline-blue-500" id="input" multiple />
                <button
                    type="submit"
                    className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-6">
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Statistic;