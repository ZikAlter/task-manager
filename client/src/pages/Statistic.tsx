import {FC} from "react";


const Statistic: FC = () => {
    return (
        <div>
            <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-600">Статистика пользователей</h1>
            <p>Фамилия: Иванов</p>
            <p>Имя: Иван</p>
            <p>Отчество: Иванович</p>
            <p>Выполненных задач: 11</p>
            <p>Активных задач: 0</p>
        </div>
    );
};

export default Statistic;