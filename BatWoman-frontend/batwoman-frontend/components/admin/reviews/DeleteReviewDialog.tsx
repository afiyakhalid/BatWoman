"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

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
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E8C9C5] bg-white px-4 py-2.5 text-sm font-medium text-[#9B5148] transition-colors hover:bg-[#F9EDEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7655B] focus-visible:ring-offset-2"
            >
                <Trash2 size={16} strokeWidth={1.8} />
                Delete Review
            </button>

            <AlertDialog
                open={open}
                onOpenChange={setOpen}
            >
                <AlertDialogContent className="max-w-md gap-0 overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-0 text-[#3D3028] shadow-[0_20px_60px_rgba(61,48,40,0.15)]">
                    <div className="border-b border-[#EAE3D8] bg-[#F7F2EA] px-6 py-5">
                        <AlertDialogHeader className="text-left">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8C9C5] bg-[#F9EDEA] text-[#9B5148]">
                                    <AlertTriangle
                                        size={21}
                                        strokeWidth={1.7}
                                    />
                                </div>

                                <AlertDialogTitle className="text-lg font-semibold tracking-tight text-[#3D3028]">
                                    Delete Review?
                                </AlertDialogTitle>
                            </div>

                            <AlertDialogDescription className="pt-3 text-sm leading-6 text-[#75675C]">
                                This action cannot be undone. The review
                                will be permanently removed from your store.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </div>

                    <AlertDialogFooter className="flex-col-reverse gap-2 bg-[#FAF7F2] px-6 py-4 sm:flex-row">
                        <AlertDialogCancel className="mt-0 h-11 rounded-xl border-[#E0D5C5] bg-white px-5 text-[#59483A] hover:bg-[#F5EFE5] hover:text-[#3D3028]">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            className="h-11 rounded-xl border border-[#A95148] bg-[#A95148] px-5 text-white hover:bg-[#8E4038] focus-visible:ring-[#B7655B]"
                            onClick={handleDelete}
                        >
                            <Trash2 size={15} className="mr-2" />
                            Delete Review
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}