"use client";

import { useEffect, useState } from "react";
import {
    FolderPlus,
    FileText,
    Tag,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { Category } from "./CategoryRow";

interface CategoryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    onSave: (name: string, description: string) => void;
}

export default function CategoryForm({
                                         open,
                                         onOpenChange,
                                         category,
                                         onSave,
                                     }: CategoryFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!open) return;

        if (category) {
            setName(category.name);
            setDescription(category.description ?? "");
        } else {
            setName("");
            setDescription("");
        }
    }, [category, open]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName) return;

        onSave(trimmedName, trimmedDescription);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90dvh] overflow-y-auto border-[#E7DDD0] bg-[#FFFDFA] p-5 text-[#30271F] sm:max-w-lg sm:rounded-2xl sm:p-7">
                <DialogHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D8C5] bg-[#F1E7D9] text-[#8D6B43]">
                        {category ? (
                            <Tag size={20} strokeWidth={1.7} />
                        ) : (
                            <FolderPlus size={20} strokeWidth={1.7} />
                        )}
                    </div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                        Store management
                    </p>

                    <DialogTitle className="font-[var(--font-playfair)] text-2xl font-medium text-[#30271F] sm:text-3xl">
                        {category ? "Edit Category" : "Add Category"}
                    </DialogTitle>

                    <p className="text-sm leading-relaxed text-[#8B8174]">
                        {category
                            ? "Update the details for this product category."
                            : "Create a category to organize your abaya collection."}
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 py-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="category-name"
                                className="flex items-center gap-2 text-sm font-medium text-[#5F5142]"
                            >
                                <Tag size={14} className="text-[#A18A6E]" />
                                Category Name
                                <span className="text-[#A34E3E]">*</span>
                            </label>

                            <Input
                                id="category-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Luxury Abayas"
                                required
                                maxLength={100}
                                className="h-11 rounded-xl border-[#E5D8C6] bg-white text-sm text-[#30271F] placeholder:text-[#B1A596] focus-visible:border-[#A18A6E] focus-visible:ring-[#A18A6E]/20"
                            />

                            <p className="text-[11px] text-[#A09484]">
                                Choose a clear name customers can understand.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="category-description"
                                className="flex items-center gap-2 text-sm font-medium text-[#5F5142]"
                            >
                                <FileText size={14} className="text-[#A18A6E]" />
                                Description
                            </label>

                            <Textarea
                                id="category-description"
                                rows={4}
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Describe this premium abaya collection..."
                                maxLength={1000}
                                className="min-h-28 resize-y rounded-xl border-[#E5D8C6] bg-white text-sm leading-relaxed text-[#30271F] placeholder:text-[#B1A596] focus-visible:border-[#A18A6E] focus-visible:ring-[#A18A6E]/20"
                            />

                            <p className="text-right text-[11px] text-[#A09484]">
                                {description.length}/1000
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex-col-reverse gap-2 border-t border-[#F0E8DE] pt-4 sm:flex-row sm:gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full rounded-xl border-[#E5D8C6] bg-white text-[#5F5142] hover:bg-[#F8F3EC] sm:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim()}
                            className="w-full rounded-xl bg-[#493A2B] text-white hover:bg-[#35291F] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            {category ? "Update Category" : "Create Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}