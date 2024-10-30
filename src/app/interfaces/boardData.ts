export interface IBoardData {
  name: string,
  columns: ICloumn[],
}
export interface ICloumn{
    name: string,
    tasks: ITask[],
}
export interface ITask{
  title:string,
  description: string,
  status: string,
  subtasks:ISubTask[]
}
export interface ISubTask{
  title: string,
 isCompleted: boolean
}
