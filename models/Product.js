import { sequelize } from "./index.js";
import {DataTypes} from "sequelize";

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0,
    },
    productViewed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now(),
    },
    updatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now(),
    },
    deletedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now(),
    },
  }, {
    timestamps: true,
    createdAt: "createdDate",
    updatedAt: "updatedDate",
    deletedAt: "deletedDate",
    freezeTableName: true,
  }
);


(async () => {
    await Product.sync();
})();

export default Product;