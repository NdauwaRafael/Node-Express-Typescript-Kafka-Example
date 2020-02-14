import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {db} from "../helpers/database";

class Notification extends Model {
    public id!: number;
    public title!: string;
    public message!: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Notification.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    message: {
        type: new DataTypes.STRING(128),
        allowNull: true
    }
}, {
    tableName: 'notifications',
    sequelize: db, // this bit is important
});

export default Notification;