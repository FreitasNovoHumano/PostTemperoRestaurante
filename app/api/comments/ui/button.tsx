/**
 * 🔘 BUTTON COM LOADING
 */

export default function Button({
  children,
  loading,
  ...props
}: any) {
  return (
    <button
      {...props}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Carregando..." : children}
    </button>
  );

  <Button loading={mutation.isPending}>
  Salvar
</Button>
}