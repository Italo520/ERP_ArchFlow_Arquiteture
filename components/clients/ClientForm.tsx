"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { clientSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient, updateClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { ClientStatus } from "@prisma/client";

interface ClientFormProps {
    initialData?: any;
}

export function ClientForm({ initialData }: ClientFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(clientSchema),
        defaultValues: initialData ? {
            ...initialData,
            address: initialData.address || {
                cep: "",
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                state: "",
            },
        } : {
            name: "",
            email: "",
            phone: "",
            document: "",
            address: {
                cep: "",
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                state: "",
            },
            status: ClientStatus.PROSPECT,
        },
    });

    async function onSubmit(values: z.infer<typeof clientSchema>) {
        setIsLoading(true);
        try {
            let result;
            if (initialData?.id) {
                result = await updateClient(initialData.id, { ...values, id: initialData.id });
            } else {
                result = await createClient(values);
            }

            if (result.error) {
                console.error(result.error);
                alert(`Erro ao ${initialData ? "atualizar" : "criar"} cliente: ` + JSON.stringify(result.error));
            } else {
                router.push("/clients");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            alert(`Erro ao ${initialData ? "atualizar" : "criar"} cliente.`);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCepSearch() {
        const cep = form.getValues("address.cep");
        // Ensure cep is string and length check
        if (!cep || typeof cep !== "string" || cep.length < 8) return;

        setCepLoading(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                form.setValue("address.street", data.logradouro);
                form.setValue("address.neighborhood", data.bairro);
                form.setValue("address.city", data.localidade);
                form.setValue("address.state", data.uf);
                form.setFocus("address.number");
            } else {
                alert("CEP não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            alert("Erro ao buscar CEP.");
        } finally {
            setCepLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Completo *</FormLabel>
                                <FormControl>
                                    <Input placeholder="João da Silva" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    <Input placeholder="joao@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="(11) 99999-9999" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF/CNPJ</FormLabel>
                                <FormControl>
                                    <Input placeholder="000.000.000-00" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <FormField
                            control={form.control}
                            name="address.cep"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input placeholder="00000-000" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <Button type="button" variant="outline" size="icon" onClick={handleCepSearch} disabled={cepLoading}>
                                            {cepLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rua das Flores" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="address.number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apto 101" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.neighborhood"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Centro" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="São Paulo" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SP" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Salvar Alterações" : "Criar Cliente"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
