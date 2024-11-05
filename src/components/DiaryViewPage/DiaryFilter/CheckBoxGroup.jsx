import React, { useState } from 'react';
import { Checkbox, Box, Typography } from '@mui/material';

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
    <Box mt={2} display="flex" flexWrap="wrap" gap="5px">
      {labels.map((label) => (
        <Box key={label} display="flex" alignItems="center" gap="5px" width="48%">
          <Checkbox
            size="small"
            checked={checkedItems[label]}
            onChange={() => handleCheckboxChange(label)}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 18 },
              padding: '2px',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'font-notosansKR-light',
              fontSize: '13px',
              color: '#333',
            }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default CheckBoxGroup;
