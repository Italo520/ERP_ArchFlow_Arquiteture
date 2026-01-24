
import { getClientById } from "@/app/actions/client";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Trash2, MapPin, Phone, Mail, Globe, Calendar } from "lucide-react";

export default async function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const client = await getClientById(id);

    if (!client) {
        notFound();
    }

    // Serialize to avoid date warnings if passing to client components
    const safeClient = JSON.parse(JSON.stringify(client));

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        {client.name}
                        <Badge variant={client.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {client.status}
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {client.category ? <Badge variant="outline" className="mr-2">{client.category}</Badge> : null}
                        Cliente desde {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href={`/clients/${client.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Link>
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="projects">Projetos ({client._count.projects})</TabsTrigger>
                    <TabsTrigger value="activities">Atividades ({client._count.activities})</TabsTrigger>
                    <TabsTrigger value="finance">Financeiro & Docs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações de Contato</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {client.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">{client.email}</a>
                                    </div>
                                )}
                                {client.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{client.phone}</span>
                                    </div>
                                )}
                                {client.website && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{client.website}</a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Endereço</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {(client.address as any)?.street ? (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <div>
                                            <p>{(client.address as any).street}, {(client.address as any).number}</p>
                                            <p>{(client.address as any).neighborhood}</p>
                                            <p>{(client.address as any).city} - {(client.address as any).state}</p>
                                            <p className="text-sm text-muted-foreground">{(client.address as any).cep}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Nenhum endereço cadastrado.</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Detalhes Legais</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-muted-foreground">Tipo</span>
                                        <p>{client.legalType || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">Documento</span>
                                        <p>{client.document || '-'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Observações</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.notes || "Sem observações."}</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projetos Recentes</CardTitle>
                            <CardDescription>Lista de projetos associados a este cliente.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {client.projects && client.projects.length > 0 ? (
                                <ul className="space-y-4">
                                    {client.projects.map((project: any) => (
                                        <li key={project.id} className="border p-4 rounded-lg flex justify-between items-center hover:bg-muted/50 transition-colors">
                                            <div>
                                                <h4 className="font-semibold">{project.name}</h4>
                                                <p className="text-sm text-muted-foreground">{project.status}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/projects/${project.id}`}>Ver Projeto</Link>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    Nenhum projeto encontrado.
                                    <div className="mt-4">
                                        <Button>Criar Novo Projeto</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activities" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Atividades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Histórico de atividades em breve.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="finance" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Financeiro & Documentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Módulo financeiro em desenvolvimento.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
