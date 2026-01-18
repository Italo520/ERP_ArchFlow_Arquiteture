'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/actions/project';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.target);

        try {
            const result = await createProject(formData);
            if (result.success) {
                router.push(`/projects/${result.projectId}`);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Erro ao criar projeto');
            setLoading(false);
        }
    }

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl font-black mb-8 text-foreground">Novo Projeto</h1>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-6 border border-destructive/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-bold text-foreground">Nome do Projeto *</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Ex: Residência Silva"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="clientName" className="text-sm font-bold text-foreground">Cliente</label>
                            <input
                                type="text"
                                name="clientName"
                                id="clientName"
                                placeholder="Nome do Cliente"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="projectType" className="text-sm font-bold text-foreground">Tipo de Obra</label>
                            <select
                                name="projectType"
                                id="projectType"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="Residencial">Residencial</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Corporativo">Corporativo</option>
                                <option value="Interiores">Interiores</option>
                                <option value="Institucional">Institucional</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="totalArea" className="text-sm font-bold text-foreground">Área Total (m²)</label>
                            <input
                                type="number"
                                name="totalArea"
                                id="totalArea"
                                placeholder="0.00"
                                step="0.01"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="text-sm font-bold text-foreground">Endereço da Obra</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Logradouro, Número, Bairro, Cidade - UF"
                            className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="startDate" className="text-sm font-bold text-foreground">Data de Início</label>
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="deliveryDate" className="text-sm font-bold text-foreground">Previsão de Entrega</label>
                            <input
                                type="date"
                                name="deliveryDate"
                                id="deliveryDate"
                                className="h-12 px-4 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="imageFile" className="text-sm font-bold text-foreground">Imagem de Capa (Opcional)</label>
                        <input
                            type="file"
                            name="imageFile"
                            id="imageFile"
                            accept="image/*"
                            className="h-12 px-4 py-2 rounded-xl bg-secondary/50 border border-input focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-full border border-border font-bold hover:bg-secondary transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? 'Criando...' : 'Criar Projeto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
