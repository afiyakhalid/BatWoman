"use client";

import { useEffect, useState } from "react";

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

import { Category } from "./CategoryRow";

interface CategoryFormProps {

    open: boolean;

    onOpenChange: (open: boolean) => void;

    category?: Category | null;

    onSave: (

        name: string,

        description: string

    ) => void;

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

        if (category) {

            setName(category.name);

            setDescription(category.description);

        } else {

            setName("");

            setDescription("");

        }

    }, [category]);

    function handleSubmit() {

        onSave(name, description);

    }

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle className="font-[var(--font-playfair)] text-3xl">

                        {

                            category

                                ? "Edit Category"

                                : "Add Category"

                        }

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-6 py-4">

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Category Name

                        </label>

                        <Input

                            value={name}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)
}

                            placeholder="Luxury Abayas"

                        />

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Description

                        </label>

                        <Textarea

                            rows={5}

                            value={description}

                            onChange={(e) =>

                                setDescription(

                                    e.target.value

                                )

                            }

                            placeholder="Premium luxury abaya collection..."

                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button

                        variant="outline"

                        onClick={() =>

                            onOpenChange(false)

                        }

                    >

                        Cancel

                    </Button>

                    <Button

                        onClick={handleSubmit}

                    >

                        {

                            category

                                ? "Update"

                                : "Create"

                        }

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}