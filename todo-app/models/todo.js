"use strict";
const { Model,Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos() {
      return this.findAll();
    }

    static async overdue() {
     return this.findAll({
          where : {
            dueDate:{
              [Op.lt]: new Date(),
              //completed:false // changed
            },
          },
          order : [["id","ASC"]],
        });
        
    }

    static async dueToday() {
      return this.findAll({
           where : {
             dueDate:{
               [Op.eq]: new Date(),
               //completed:false // changed
             },
           },
           order : [["id","ASC"]],
         });
         
     }

     static async dueLater() {
      return this.findAll({
           where : {
             dueDate:{
               [Op.gt]: new Date(),
               //completed:false // changed
             },
           },
           order : [["id","ASC"]],
         });
         
     }

    markAsCompleted() {
      return this.update({ completed: !this.completed });
    }

    // deleteTodo() {
    //   return this.destroy({ where: { id: this.id } });
    // }
    static async remove(id) {
      return this.destroy({ where: {id:id}});
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
