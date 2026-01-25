"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Phone,
    UserPlus,
    MoreHorizontal,
    Shield,
    ExternalLink
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function ProjectTeamTab({ project }: { project: any }) {
    const architects = project.architects || [];
    const client = project.client;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Equipe do Projeto</h3>
                <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Membro
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Internos</h4>
                    <div className="grid gap-4">
                        {architects.map((arc: any) => (
                            <Card key={arc.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                                                <AvatarImage src={arc.avatarUrl} />
                                                <AvatarFallback className="bg-primary/5 text-primary">
                                                    {arc.fullName?.substring(0, 2).toUpperCase() || 'AR'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-semibold text-sm">{arc.fullName}</h5>
                                                    <Badge variant="secondary" className="text-[10px] h-4">Arquiteto</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{arc.email}</p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem><Mail className="h-4 w-4 mr-2" /> Enviar Email</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Remover do Projeto</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] gap-1">
                                            <Shield className="h-3 w-3" /> Ver Permissões
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Stakeholders</h4>
                    <div className="grid gap-4">
                        {client && (
                            <Card className="border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-lg">
                                                    {client.name?.charAt(0) || 'C'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-semibold text-sm">{client.name}</h5>
                                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Cliente</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{client.email}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                            <a href={`/crm/clients/${client.id}`}>
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <Button variant="secondary" size="sm" className="h-8 gap-2 text-xs">
                                            <Mail className="h-3.5 w-3.5" /> Email
                                        </Button>
                                        <Button variant="secondary" size="sm" className="h-8 gap-2 text-xs">
                                            <Phone className="h-3.5 w-3.5" /> Contato
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="border-dashed border-2 bg-muted/5">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
                                    <UserPlus className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <h5 className="text-sm font-medium">Parceiros e Fornecedores</h5>
                                <p className="text-[10px] text-muted-foreground mt-1 px-4">
                                    Vincule construtoras, engenheiros e fornecedores a este projeto.
                                </p>
                                <Button variant="link" size="sm" className="text-xs mt-2">Vincular Agora</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
