const TableBody = ({ users }) => {
  return (
    <tbody>
      {users &&
        users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.car}</td>
              <td>{user.car_model}</td>
              <td>{user.car_vin}</td>
              <td>{user.car_color}</td>
              <td>{user.car_model_year}</td>
              <td>{user.price}</td>
              <td>{user.availability.toString()}</td>
              <td>Edit</td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableBody;
