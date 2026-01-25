"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { uploadProjectDocument, deleteProjectDocument } from "@/app/actions/project";
import { useRouter } from "next/navigation";
import { FileText, Trash2, ExternalLink } from "lucide-react";

export default function ProjectDocumentsTab({ project }: { project: any }) {
    const [isAdding, setIsAdding] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const documents = (project.attachedDocuments as any[]) || [];

    async function handleAddDocument() {
        if (!fileName.trim() || !fileUrl.trim()) return;
        setIsLoading(true);
        try {
            await uploadProjectDocument(project.id, fileUrl, fileName);
            setFileName("");
            setFileUrl("");
            setIsAdding(false);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(url: string) {
        if (!confirm("Tem certeza que deseja remover este documento?")) return;
        setIsLoading(true);
        try {
            await deleteProjectDocument(project.id, url);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Documentos e Licenças</h3>
                <Button onClick={() => setIsAdding(!isAdding)} variant="outline">
                    {isAdding ? "Cancelar" : "Novo Documento"}
                </Button>
            </div>

            {isAdding && (
                <Card className="mb-6">
                    <CardContent className="pt-6 grid gap-4">
                        <Input
                            placeholder="Nome do Documento (ex: Alvará de Construção)"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <Input
                            placeholder="Link / URL do Arquivo"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                        />
                        <Button onClick={handleAddDocument} disabled={isLoading}>Salvar Documento</Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4 flex items-start justify-between">
                            <div className="flex gap-3">
                                <div className="bg-primary/10 p-2 rounded-md">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm line-clamp-1" title={doc.name}>{doc.name}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "Data N/A"}
                                    </p>
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        Visualizar <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                onClick={() => handleDelete(doc.url)}
                                disabled={isLoading}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                {documents.length === 0 && (
                    <div className="col-span-full py-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        Nenhum documento anexado ao projeto.
                    </div>
                )}
            </div>
        </div>
    );
}
