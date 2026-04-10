import { prisma } from "../../lib/prisma"
import { notFound } from "next/navigation"
import Carousel from "../../components/shared/ImageCarousel"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) notFound()

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  })
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Main layout — stacks on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — carousel */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
            <Carousel
              images={product.images.map(img => img.id)}
              className="w-full h-72 sm:h-96 rounded-2xl"
            />
          </div>

          {/* Right — product details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.educationField}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                {product.title}
              </h1>
            </div>

            <div className="text-3xl font-bold text-gray-900">
              NOK {product.price.toFixed(2)}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Contact seller
            </button>

            <div className="pt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Details</h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount in stock</span>
                  <span className="text-gray-900">{product.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Published</span>
                  <span className="text-gray-900">
                    {new Date(product.publishedAt).toLocaleDateString("no-NO")}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}