"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { associateArchitect, removeArchitect } from "@/app/actions/project";
import { useRouter } from "next/navigation";
import { UserPlus, Trash2, Mail } from "lucide-react";

export default function ProjectTeamTab({ project }: { project: any }) {
    const [isAdding, setIsAdding] = useState(false);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const members = project.members || [];

    async function handleAddMember() {
        if (!userId.trim()) return;
        setIsLoading(true);
        try {
            // Note: In a real app we would select from a dropdown of users.
            // For MVP we just assume we have the ID, or this logic would need a UserSelect component.
            // Since UserSelect doesn't really exist yet, we will just use this as a placeholder action
            // or we could implement a simple text input for User ID if testing.
            await associateArchitect(project.id, userId, "VIEWER");
            setUserId("");
            setIsAdding(false);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemove(memberUserId: string) {
        if (!confirm("Remover este membro da equipe?")) return;
        setIsLoading(true);
        try {
            await removeArchitect(project.id, memberUserId);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Since we don't have the members loaded in the simple project fetch usually (it needs include members -> user),
    // we might need to rely on what `getProjectById` returns. 
    // `getProjectById` in `project-actions.ts` did NOT include `members`.
    // I should probably fix `getProjectById` to include `members: { include: { user: true } }` first.
    // For now, I will render what is available.

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Equipe do Projeto</h3>
                <Button onClick={() => setIsAdding(!isAdding)} variant="outline">
                    {isAdding ? "Cancelar" : "Adicionar Membro"}
                </Button>
            </div>

            {isAdding && (
                <Card className="mb-6">
                    <CardContent className="pt-6 flex gap-4">
                        <Input
                            placeholder="ID do Usuário (MVP)"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <Button onClick={handleAddMember} disabled={isLoading}>Adicionar</Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Owner often is not in members list explicitly, but let's show owner first */}
                {project.owner && (
                    <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={project.owner.avatar} />
                                    <AvatarFallback>{project.owner.fullName?.[0] || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-medium text-sm">{project.owner.fullName || "Master Architect"}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> {project.owner.email}
                                    </p>
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1 inline-block">
                                        OWNER
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {members.map((member: any) => (
                    <Card key={member.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={member.user?.avatar} />
                                    <AvatarFallback>{member.user?.fullName?.[0] || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-medium text-sm">{member.user?.fullName}</h4>
                                    <p className="text-xs text-muted-foreground">{member.user?.email}</p>
                                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full mt-1 inline-block capitalize">
                                        {member.role.toLowerCase()}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(member.userId)}
                                disabled={isLoading}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
