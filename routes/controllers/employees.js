const {prisma} = require("../../prisma/prisma-client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route GET /api/employees
 * @desс Получение списка всех сотрудников
 * @access Private
 */
const getEmployeesList = async (req, res) => {
    try {
        // все юзеры видят всех сотрудников. Но редактировать могут только своих
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Не удалось получить список сотрудников' });
    }
}

/**
 * @route GET /api/employees/:id
 * @desс Получение сотрудника по id
 * @access Private
 */
const getEmployee = async (req, res) => {
    try {
        const { id } = req.params; // GET запрос - запрос получаем из адресной строки
        console.log('id:', id);
        const employee = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Не удалось получить сотрудника' });
    }
}

/**
 * @route POST /api/employees/:id
 * @desс Добавление нового сотрудника
 * @access Private
 */
const addEmployee = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            age,
            address
        } = req.body;

        // валидация
        if (!firstname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите имя сотрудника' });
        }

        if (!lastname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите фамилию сотрудника' });
        }

        if (!age) {
            return res.status(400).json({ message: 'Пожалуйста, укажите возраст сотрудника' });
        }

        if (!address) {
            return res.status(400).json({ message: 'Пожалуйста, укажите адрес сотрудника' });
        }

        // await prisma.user.update({
        //     where: {
        //         id: req.user.id // юзер из middleware
        //     },
        //     data: {
        //         createdEmployees: {
        //             create: {
        //                 firstName,
        //                 lastName,
        //                 age,
        //                 address
        //             }
        //         }
        //     }
        // });

        const newEmployee = await prisma.employee.create({
            data: {
                firstname,
                lastname,
                age,
                address,
                user_id: req.user.id
                }
        });

        return res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Не удалось добавить сотрудника' });
    }
}

/**
 * @route PUT /api/employees/:id
 * @desс Редактирование сотрудника
 * @access Private
 */
const updateEmployee = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            age,
            address,
        } = req.body;

        const { id } = req.params;

        console.log('employee id:', id);

        // валидация
        if (!firstname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите имя сотрудника' });
        }

        if (!lastname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите фамилию сотрудника' });
        }

        if (!age) {
            return res.status(400).json({ message: 'Пожалуйста, укажите возраст сотрудника' });
        }

        if (!address) {
            return res.status(400).json({ message: 'Пожалуйста, укажите адрес сотрудника' });
        }

        await prisma.employee.update({
            where: {
                id: Number(id),
                // user_id: req.user.id
            },
            data: {
                firstname,
                lastname,
                age,
                address
            }
        });

        const updatedEmployee = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ message: 'Не удалось обновить сотрудника' });
    }
}

/**
 * @route DELETE /api/employees/:id
 * @desс Удаление сотрудника
 * @access Private
 */
const deleteEmployee = async (req, res) => {
    try {
        await prisma.employee.delete({
            where: {
                id: Number(req.params.id),
                // user_id: req.user.id // удаляем только если юзеры совпадают
            }
        });
        return res.status(200).json({ message: 'Сотрудник удален' });
    } catch (err) {
        res.status(500).json({ message: 'Не удалось удалить сотрудника' });
    }
}


module.exports = {
    getEmployeesList,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
}