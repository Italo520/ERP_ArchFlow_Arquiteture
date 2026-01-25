"use client";

import { useEffect, useState } from "react";
import { getProjectById } from "@/app/actions/project";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                const result = await getProjectById(params.id as string);
                if (result.success) {
                    setProject(result.data);
                } else {
                    router.push("/404");
                }
            } catch (error) {
                console.error(error);
                router.push("/projects");
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="container py-10 space-y-8">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-[600px] w-full" />
            </div>
        );
    }

    return (
        <div className="container py-10 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
                <p className="text-muted-foreground">
                    Atualize as informações e detalhes técnicos do projeto "{project?.name}".
                </p>
            </div>

            <ProjectForm initialData={project} isEditing={true} />
        </div>
    );
}
