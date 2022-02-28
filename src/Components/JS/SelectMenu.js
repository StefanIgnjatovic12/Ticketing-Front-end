import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react';



export default function SelectMenu(props) {
  const [personName, setPersonName] = useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <div>
      {/*<FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>*/}
      <FormControl sx={{ m: 1, minWidth: 300, maxWidth: 450}}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <Select
          multiple
          native
          value={personName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {props.loading ? props.users.map((user) => (
            <option key={user.id} value={user.username}>
              {`${user.first_name} ${user.last_name}`}
            </option>
          ))
          : null}
        </Select>
      </FormControl>
    </div>
  );
}