import { Table, Column, DataType, Model, HasMany, DeletedAt, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import Expense from "./Expense";
import User from "./User";

@Table({
    tableName: 'budgets'
})

class Budget extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number;

    @DeletedAt
    declare deletedAt: Date | null;

    @HasMany(() => Expense, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[];

    @ForeignKey(() => User)
    declare userId: User;

    @BelongsTo(() => User)
    declare user: User;
}

export default Budget;