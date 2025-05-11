import {FC, useState} from "react";
import PasswordInput from "../components/PasswordInput.tsx";

const CreateUser: FC = () => {
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600">Создать новую учетную запись</h1>
            <form className="mt-5 flex flex-col w-[500px] h-[500px] shadow-xl rounded-2xl">
                <div className="container flex flex-col">
                    <input type="text"
                           className="mt-3 py-3 placeholder:text-sky-500 shadow-md border-2 rounded-xl pl-2 outline-sky-500"
                           placeholder="Логин..." required/>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="text"
                           className="py-3 placeholder:text-sky-500 shadow-md border-2 rounded-xl pl-2 outline-sky-500 mt-3"
                           placeholder="Фамилия..." required/>
                    <input type="text"
                           className="py-3 placeholder:text-sky-500 shadow-md border-2 rounded-xl pl-2 outline-sky-500 mt-3"
                           placeholder="Имя..." required/>
                    <input type="text"
                           className="py-3 placeholder:text-sky-500 shadow-md border-2 rounded-xl pl-2 outline-sky-500 mt-3"
                           placeholder="Отчество..." required/>
                    <label htmlFor="countries" className="block mt-3 font-medium text-sky-500">Выберите роль:</label>
                    <select id="countries"
                            className="mt-2 shadow-md border-2 rounded-xl bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none">
                        <option selected value="Пользователь">Пользователь</option>
                        <option value="Руководитель">Руководитель</option>
                        <option value="Администратор">Администратор</option>
                    </select>
                    <button
                        className="text-white py-4 px-1 bg-green-600 rounded-2xl shadow-lg shadow-green-400/80 hover:bg-green-700 mt-5">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;