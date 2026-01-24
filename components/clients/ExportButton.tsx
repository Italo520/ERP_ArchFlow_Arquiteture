"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
// import { exportClientsCSV } from "@/app/actions/client"; // To be implemented or handled client-side

export function ExportButton() {
    const handleExport = () => {
        // Placeholder for export functionality
        // In a real implementation this would call a server action or API route
        alert("Exportação iniciada...");
    };

    return (
        <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
        </Button>
    );
}
