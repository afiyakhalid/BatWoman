interface CategoryPageProps {
    params: Promise<{
        categorySlug: string;
    }>;
}

export default async function CategoryPage({
                                               params,
                                           }: CategoryPageProps) {
    const { categorySlug } = await params;

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-32">
                <h1 className="text-4xl font-semibold">
                    {categorySlug}
                </h1>

                <p className="mt-4 text-muted-foreground">
                    Category products are currently under development.
                </p>
            </div>
        </main>
    );
}