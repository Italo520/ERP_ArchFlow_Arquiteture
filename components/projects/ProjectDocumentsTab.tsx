"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    FileText,
    Trash2,
    ExternalLink,
    Upload,
    Download,
    Search,
    File,
    MoreHorizontal
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { uploadProjectDocument, deleteProjectDocument } from "@/app/actions/project";
import { useRouter } from "next/navigation";

export default function ProjectDocumentsTab({ project }: { project: any }) {
    const [isAdding, setIsAdding] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const documents = (project.attachedDocuments as any[]) || [];

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const getFileType = (name: string) => {
        const ext = name.split('.').pop()?.toUpperCase();
        return ext || "FILE";
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar documentos..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
                            {isAdding ? "Cancelar" : "Novo Documento"}
                        </Button>
                    </div>

                    {isAdding && (
                        <Card>
                            <CardContent className="pt-6 grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nome do Documento</label>
                                        <Input
                                            placeholder="ex: Alvará de Construção"
                                            value={fileName}
                                            onChange={(e) => setFileName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Link / URL do Arquivo</label>
                                        <Input
                                            placeholder="https://..."
                                            value={fileUrl}
                                            onChange={(e) => setFileUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleAddDocument} disabled={isLoading} className="w-full sm:w-auto ml-auto">
                                    Salvar Documento
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                                    <TableHead className="hidden md:table-cell">Data</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDocuments.map((doc, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                                <span className="font-medium line-clamp-1">{doc.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <span className="text-xs px-2 py-1 bg-muted rounded uppercase">
                                                {getFileType(doc.name)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                                            {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => window.open(doc.url)}>
                                                            <Download className="h-4 w-4 mr-2" /> Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc.url)}>
                                                            <Trash2 className="h-4 w-4 mr-2" /> Excluir
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredDocuments.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                            Nenhum documento encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                        <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium">Upload de Documento</p>
                                <p className="text-xs text-muted-foreground">Arraste ou clique para selecionar</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase">PDF, PNG, JPG, DOCX (Max 10MB)</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <File className="h-4 w-4" /> Armazenamento
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Utilizado</span>
                                    <span className="font-medium">24.5 MB / 100 MB</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[25%]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
