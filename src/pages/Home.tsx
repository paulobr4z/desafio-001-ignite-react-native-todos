import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface IEditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find(task => task.title === newTaskTitle)

    if (findTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [
          {
            text: "ok"
          }
        ]
      )      
    } else {
      const newTask = {
        id: tasks.length,
        title: newTaskTitle,
        editable: false,
        done: false,
      }
  
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    const updateTaskDone = [...tasks];

    updateTaskDone[taskIndex].done = !updateTaskDone[taskIndex].done;

    setTasks(updateTaskDone);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "não"
        },
        {
          text: "sim",
          onPress: () => {
            setTasks(tasks => tasks.filter(
              task => task.id !== id
            ));
          }
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: IEditTask ) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    const updateTaskEdit = [...tasks];

    updateTaskEdit[taskIndex].title = taskNewTitle;

    setTasks(updateTaskEdit);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})