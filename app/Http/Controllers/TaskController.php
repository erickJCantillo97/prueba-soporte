<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Listar tareas
    public function index()
    {
        $tasks = Task::with('user')->get();
        if(request('state') == 'Completed')
            $tasks = $tasks->where('completed', 1);
        if(request('state') == 'Pending')
            $tasks = $tasks->where('completed', 0);
        return response()->json($tasks);
    }


    // Crear tarea
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:500',
            'user' => 'required|integer|exists:users,id',
        ]);
        try {
            $task = Task::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'user_id' => $validated['user'],
            ]);

            return response()->json([
                'message' => 'Task created successfully',
                'task' => $task
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Actualizar tarea
    public function update(Request $request, Task $task)
    {

        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:500',
        ]);
        try
        {
            $task->update($validated);
            return response()->json([
                'message' => 'Task updated successfully',
                'task' => $task
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
       
    }

    // Eliminar tarea
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }

    public function complete(Task $task)
    {
        $task->completed = !$task->completed;
        $task->save();
        return response()->json([
            'message' => 'Task completed successfully',
        ]);
    }
}
