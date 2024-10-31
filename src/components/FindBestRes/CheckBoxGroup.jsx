import React, { useState } from 'react';
import { Checkbox } from '@mui/material';

function CheckBoxGroup({ labels }) {
  const [checkedItems, setCheckedItems] = useState(
    labels.reduce((acc, label) => ({ ...acc, [label]: false }), {})
  );

  const handleCheckboxChange = (name) => {
    if (name === '전체') {
      const allChecked = !checkedItems['전체'];
      const updatedCheckedItems = labels.reduce((acc, label) => {
        acc[label] = allChecked;
        return acc;
      }, {});
      setCheckedItems(updatedCheckedItems);
    } else {
      setCheckedItems((prev) => {
        const newCheckedItems = { ...prev, [name]: !prev[name] };
        const allSelected = labels.slice(1).every((label) => newCheckedItems[label]);
        newCheckedItems['전체'] = allSelected;
        return newCheckedItems;
      });
    }
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {labels.map((label) => (
        <label key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            size="small"
            checked={checkedItems[label]}
            onChange={() => handleCheckboxChange(label)}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 18 }
            }}
          />
          <div className='checkBox-label-text'>
            {label}
          </div>
        </label>
      ))}
    </div>
  );
}

export default CheckBoxGroup;
