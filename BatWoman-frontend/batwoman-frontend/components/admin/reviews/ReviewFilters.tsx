"use client";

interface Props {

    search: string;

    setSearch: (value: string) => void;

    rating: number;

    setRating: (rating: number) => void;

}

export default function ReviewFilters({

                                          search,

                                          setSearch,

                                          rating,

                                          setRating,

                                      }: Props) {

    return (

        <div className="space-y-6">

            <input

                type="text"

                placeholder="Search reviews..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

                className="w-full rounded-xl border border-neutral-300 px-5 py-3 outline-none transition focus:border-black"

            />

            <div className="flex flex-wrap gap-3">

                <button

                    onClick={() => setRating(0)}

                    className={`rounded-full border px-5 py-2 transition ${
                        rating === 0
                            ? "bg-black text-white"
                            : "bg-white"
                    }`}

                >
                    All
                </button>

                {[5,4,3,2,1].map((value) => (

                    <button

                        key={value}

                        onClick={() => setRating(value)}

                        className={`rounded-full border px-5 py-2 transition ${
                            rating === value
                                ? "bg-black text-white"
                                : "bg-white"
                        }`}

                    >

                        {"★".repeat(value)}

                    </button>

                ))}

            </div>

        </div>

    );

}