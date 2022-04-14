import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: tasks.length,
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, newTask]);
    console.log('handleAddTask')
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    const updateTaskDone = [...tasks];

    updateTaskDone[taskIndex].done = !updateTaskDone[taskIndex].done;

    setTasks(updateTaskDone);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(
      task => task.id !== id
    )); 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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