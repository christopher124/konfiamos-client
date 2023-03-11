export function AdminLayout(props) {
  const { children } = props; // hijo de un componente
  return (
    <div>
      <h2>Se esta utilizando el AdminLayout</h2>
      {children}
    </div>
  );
}
