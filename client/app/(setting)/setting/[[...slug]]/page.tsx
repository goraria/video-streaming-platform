type SettingPageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function SettingPage({ params }: SettingPageProps) {
  const { slug = [] } = await params
  const title = slug.length ? slug.join(" / ") : "setting"

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold capitalize">{title}</h1>
      <p className="text-muted-foreground">Noi dung dang duoc cap nhat.</p>
    </section>
  )
}
