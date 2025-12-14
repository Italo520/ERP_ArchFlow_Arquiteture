import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDraggable,
    useDroppable
} from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ProjectService from '../../services/project.service';
import TaskService from '../../services/task.service';

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

function Droppable({ id, children, className }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
}

function TaskCard({ task }) {
    const getPriorityColor = (p) => {
        switch (p) {
            case 'URGENT': return 'bg-red-500 text-white';
            case 'HIGH': return 'bg-orange-500 text-white';
            case 'MEDIUM': return 'bg-yellow-500 text-black';
            case 'LOW': return 'bg-blue-500 text-white';
            default: return 'bg-gray-300 text-black';
        }
    };

    return (
        <div className="flex flex-col gap-2 rounded-lg bg-background-light dark:bg-neutral-900 p-4 shadow-sm hover:shadow-md transition-shadow border border-neutral-200 dark:border-neutral-800">
            <div className="flex justify-between items-start">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority || 'NORMAL'}
                </span>
                {task.dueDate && (
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">calendar_today</span>
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>
            <h4 className="text-[#151414] dark:text-neutral-100 text-sm font-bold leading-tight">
                {task.title || 'Sem Título'}
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs line-clamp-2">
                {task.description}
            </p>
            {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {task.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-1.5 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function SortableStage({ stage, onDelete, onAddTask, editingStage, editStageName, setEditStageName, handleUpdateStage, startEditingStage }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: stage.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex w-72 flex-shrink-0 flex-col rounded-xl bg-neutral-100 dark:bg-neutral-800/50 p-3"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-1">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                        title="Arrastar para reordenar"
                    >
                        <span className="material-symbols-outlined text-neutral-500 dark:text-neutral-400 text-sm">drag_indicator</span>
                    </div>

                    <h2 className="text-[#151414] dark:text-neutral-100 text-sm font-bold leading-normal cursor-pointer flex-1">
                        {stage.name}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300">
                        {stage.tasks ? stage.tasks.length : 0}
                    </span>
                </div>
            </div>

            <Droppable id={stage.id} className="flex-1 space-y-3 overflow-y-auto pr-1 min-h-[100px]">
                {(!stage.tasks || stage.tasks.length === 0) ? (
                    <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 min-h-[100px]">
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">Nenhuma tarefa.</p>
                    </div>
                ) : (
                    stage.tasks.map((task) => (
                        <Draggable key={task.id} id={task.id}>
                            <TaskCard task={task} />
                        </Draggable>
                    ))
                )}
            </Droppable>

            <button
                onClick={() => onAddTask(stage.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/50"
            >
                <span className="material-symbols-outlined text-base">add</span>
                Adicionar Tarefa
            </button>
        </div>
    );
}

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // New Task Form State
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskTags, setNewTaskTags] = useState(''); // Comma separated

    const [selectedStageId, setSelectedStageId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Stage editing (placeholder states as functionality is limited in backend atm)
    const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
    const [newStageName, setNewStageName] = useState('');
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const data = await ProjectService.getProjectById(id);
            setProject(data);
        } catch (error) {
            console.error("Error loading project", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event) => setActiveId(event.active.id);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Check if we're dragging a stage
        const isStage = project.stages.some(s => s.id === activeId);

        if (isStage) {
            // Stage reordering logic (client-side only for now)
            const oldIndex = project.stages.findIndex(s => s.id === activeId);
            const newIndex = project.stages.findIndex(s => s.id === overId);

            if (oldIndex !== newIndex) {
                const newStages = arrayMove(project.stages, oldIndex, newIndex);
                setProject({ ...project, stages: newStages });
            }
        } else {
            // Task reordering / moving logic
            const sourceStage = project.stages.find(stage => stage.tasks.some(task => task.id === activeId));
            const destStage = project.stages.find(stage => stage.id === overId || stage.tasks.some(task => task.id === overId));

            if (!sourceStage || !destStage) return;
            if (sourceStage.id === destStage.id) return; // Same stage reordering not implemented separately in backend for now

            // Optimistic Update
            const newProject = { ...project };
            const sourceStageIndex = newProject.stages.findIndex(s => s.id === sourceStage.id);
            const destStageIndex = newProject.stages.findIndex(s => s.id === destStage.id);

            const taskIndex = newProject.stages[sourceStageIndex].tasks.findIndex(t => t.id === activeId);
            const task = newProject.stages[sourceStageIndex].tasks[taskIndex];

            newProject.stages[sourceStageIndex].tasks.splice(taskIndex, 1);
            newProject.stages[destStageIndex].tasks.push(task);

            setProject(newProject);

            try {
                await TaskService.updateTaskStage(activeId, destStage.id);
            } catch (error) {
                console.error("Error updating task stage", error);
                loadProject(); // Revert on error
            }
        }
    };

    const handleCreateTask = async () => {
        if (!newTaskTitle || !selectedStageId) {
            alert("Título e Estágio são obrigatórios.");
            return;
        }

        try {
            const tagsList = newTaskTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

            await TaskService.createTask({
                title: newTaskTitle,
                description: newTaskDescription,
                projectId: project.id,
                stageId: selectedStageId,
                priority: newTaskPriority,
                dueDate: newTaskDueDate ? new Date(newTaskDueDate).toISOString() : null,
                tags: tagsList
            });

            setIsDialogOpen(false);
            resetForm();
            loadProject();
        } catch (error) {
            console.error("Error creating task", error);
            alert("Erro ao criar tarefa.");
        }
    };

    const resetForm = () => {
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskPriority('MEDIUM');
        setNewTaskDueDate('');
        setNewTaskTags('');
    };

    const openNewTaskDialog = (stageId) => {
        setSelectedStageId(stageId);
        setIsDialogOpen(true);
    };

    if (loading) return <div className="flex justify-center py-12">Carregando...</div>;
    if (!project) return <div className="flex justify-center py-12">Projeto não encontrado.</div>;

    const stageIds = project.stages.map(s => s.id);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display">
            <div className="relative flex h-screen min-h-screen w-full flex-col overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center p-4 justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-neutral-200 rounded-full">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div>
                                <h1 className="text-lg font-bold">{project.name}</h1>
                                <p className="text-xs text-neutral-500">{project.clientName}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Board */}
                <main className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={stageIds} strategy={horizontalListSortingStrategy}>
                            <div className="flex h-full gap-4">
                                {project.stages.map((stage) => (
                                    <SortableStage
                                        key={stage.id}
                                        stage={stage}
                                        onAddTask={openNewTaskDialog}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </main>

                {/* Modal Nova Tarefa */}
                {isDialogOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-6">
                            <h3 className="text-lg font-bold mb-4">Nova Tarefa</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Título *</label>
                                    <input
                                        className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        placeholder="Ex: Revisar planta"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold mb-1">Descrição</label>
                                    <textarea
                                        className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700"
                                        value={newTaskDescription}
                                        onChange={(e) => setNewTaskDescription(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Prioridade</label>
                                        <select
                                            className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700"
                                            value={newTaskPriority}
                                            onChange={(e) => setNewTaskPriority(e.target.value)}
                                        >
                                            <option value="LOW">Baixa</option>
                                            <option value="MEDIUM">Média</option>
                                            <option value="HIGH">Alta</option>
                                            <option value="URGENT">Urgente</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Data Vencimento</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700"
                                            value={newTaskDueDate}
                                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold mb-1">Tags (separadas por vírgula)</label>
                                    <input
                                        className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700"
                                        value={newTaskTags}
                                        onChange={(e) => setNewTaskTags(e.target.value)}
                                        placeholder="design, urgente, frontend"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateTask}
                                    className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-opacity-90"
                                >
                                    Criar Tarefa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
