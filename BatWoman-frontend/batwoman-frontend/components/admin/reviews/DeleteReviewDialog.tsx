"use client";

import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";

interface Props {

    onDelete: () => void;

}

export default function DeleteReviewDialog({

                                               onDelete,

                                           }: Props) {

    const [open, setOpen] = useState(false);

    function handleDelete() {

        onDelete();

        setOpen(false);

    }

    return (

        <>

            <button

                onClick={() => setOpen(true)}

                className="flex items-center gap-2 rounded-lg border border-red-300 px-5 py-3 text-red-600 transition hover:bg-red-50"

            >

                <Trash2 size={18} />

                Delete Review

            </button>

            <AlertDialog

                open={open}

                onOpenChange={setOpen}

            >

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>

                            Delete Review?

                        </AlertDialogTitle>

                        <AlertDialogDescription>

                            This action cannot be undone.
                            The review will be permanently removed
                            from your store.

                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogCancel>

                            Cancel

                        </AlertDialogCancel>

                        <AlertDialogAction

                            className="bg-red-600 hover:bg-red-700"

                            onClick={handleDelete}

                        >

                            Delete

                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>

        </>

    );

}