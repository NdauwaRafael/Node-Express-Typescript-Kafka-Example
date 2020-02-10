import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {db} from "../helpers/database";

class Message extends Model {
    public id!: number;
    public name!: string;
    public preferredName!: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    preferredName: {
        type: new DataTypes.STRING(128),
        allowNull: true
    }
}, {
    tableName: 'messages',
    sequelize: db, // this bit is important
});

export default Message;