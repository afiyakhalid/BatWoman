"use client";

export default function ProductSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">

      {/* Browse */}

      <div>
        <h3 className="mb-6 text-lg font-medium uppercase tracking-wider">
          Browse By
        </h3>

        <ul className="space-y-4 text-sm text-neutral-700">
          <li className="cursor-pointer hover:text-black">Luxury</li>
          <li className="cursor-pointer hover:text-black">Minimal</li>
          <li className="cursor-pointer hover:text-black">Everyday</li>
          <li className="cursor-pointer hover:text-black">Classic</li>
          <li className="cursor-pointer hover:text-black">Party Wear</li>
          <li className="cursor-pointer hover:text-black">
            Premium Collection
          </li>
        </ul>
      </div>

      <hr className="my-10 border-neutral-200" />

      {/* Price */}

      <div>
        <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
          Price
        </h3>

        <div className="space-y-3 text-sm text-neutral-700">
          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Under ₹3,000
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            ₹3,000 - ₹5,000
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Above ₹5,000
          </label>
        </div>
      </div>

      <hr className="my-10 border-neutral-200" />

      {/* Fabric */}

      <div>
        <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
          Fabric
        </h3>

        <div className="space-y-3 text-sm text-neutral-700">
          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Nida
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Linen
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Crepe
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Cotton
          </label>
        </div>
      </div>

      <hr className="my-10 border-neutral-200" />

      {/* Color */}

      <div>
        <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
          Color
        </h3>

        <div className="flex flex-wrap gap-3">

          <button className="h-6 w-6 rounded-full border bg-black" />

          <button className="h-6 w-6 rounded-full border bg-white" />

          <button className="h-6 w-6 rounded-full border bg-gray-400" />

          <button className="h-6 w-6 rounded-full border bg-green-700" />

          <button className="h-6 w-6 rounded-full border bg-yellow-200" />

        </div>
      </div>

    </aside>
  );
}