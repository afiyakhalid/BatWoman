"use client";

import { useEffect, useState } from "react";

import {

    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import {

    Address,
    CreateAddressRequest,

} from "@/services/address.service";

import {

    useCreateAddress,
    useUpdateAddress,

} from "@/hooks/useAddresses";

interface AddressFormModalProps {

    open: boolean;

    onOpenChange: (open: boolean) => void;

    address?: Address | null;

}

const initialForm: CreateAddressRequest = {

    fullName: "",

    phone: "",

    addressLine1: "",

    addressLine2: "",

    city: "",

    state: "",

    country: "India",

    postalCode: "",

    defaultAddress: false,

};

export default function AddressFormModal({

    open,

    onOpenChange,

    address,

}: AddressFormModalProps) {

    const [form, setForm] =
        useState<CreateAddressRequest>(initialForm);

    const createMutation =
        useCreateAddress();

    const updateMutation =
        useUpdateAddress();

    useEffect(() => {

        if (address) {

            setForm({

                fullName: address.fullName,

                phone: address.phone,

                addressLine1: address.addressLine1,

                addressLine2: address.addressLine2,

                city: address.city,

                state: address.state,

                country: address.country,

                postalCode: address.postalCode,

                defaultAddress:
                    address.defaultAddress,

            });

        } else {

            setForm(initialForm);

        }

    }, [address, open]);

    function updateField(

        key: keyof CreateAddressRequest,

        value: string | boolean

    ) {

        setForm((prev) => ({

            ...prev,

            [key]: value,

        }));

    }

    async function handleSubmit() {

        try {

            if (address) {

                await updateMutation.mutateAsync({

                    addressId: address.id,

                    request: form,

                });

            } else {

                await createMutation.mutateAsync(form);

            }

            onOpenChange(false);

        } catch {

            // Toast handled in hook

        }

    }

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        {address
                            ? "Edit Address"
                            : "Add New Address"}

                    </DialogTitle>

                </DialogHeader>

                <div className="grid gap-6">

                    <div>

                        <Label>

                            Full Name

                        </Label>

                        <Input

                            value={form.fullName}

                            onChange={(e) =>
                                updateField(
                                    "fullName",
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <div>

                        <Label>

                            Phone Number

                        </Label>

                        <Input

                            value={form.phone}

                            onChange={(e) =>
                                updateField(
                                    "phone",
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <div>

                        <Label>

                            Address Line 1

                        </Label>

                        <Input

                            value={form.addressLine1}

                            onChange={(e) =>
                                updateField(
                                    "addressLine1",
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <div>

                        <Label>

                            Address Line 2

                        </Label>

                        <Input

                            value={form.addressLine2}

                            onChange={(e) =>
                                updateField(
                                    "addressLine2",
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <Label>

                                City

                            </Label>

                            <Input

                                value={form.city}

                                onChange={(e) =>
                                    updateField(
                                        "city",
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                        <div>

                            <Label>

                                State

                            </Label>

                            <Input

                                value={form.state}

                                onChange={(e) =>
                                    updateField(
                                        "state",
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <Label>

                                Country

                            </Label>

                            <Input

                                value={form.country}

                                onChange={(e) =>
                                    updateField(
                                        "country",
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                        <div>

                            <Label>

                                Postal Code

                            </Label>

                            <Input

                                value={form.postalCode}

                                onChange={(e) =>
                                    updateField(
                                        "postalCode",
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Checkbox

                            checked={
                                form.defaultAddress
                            }

                            onCheckedChange={(value) =>
                                updateField(
                                    "defaultAddress",
                                    Boolean(value)
                                )
                            }

                        />

                        <Label>

                            Set as default address

                        </Label>

                    </div>

                    <Button

                        onClick={handleSubmit}

                        disabled={
                            createMutation.isPending ||
                            updateMutation.isPending
                        }

                    >

                        {address
                            ? "Update Address"
                            : "Save Address"}

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}