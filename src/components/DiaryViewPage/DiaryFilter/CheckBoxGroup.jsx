import React, { useState } from 'react';
import { Checkbox, Box, Typography } from '@mui/material';

function CheckBoxGroup({ labels, onChange }) {
  const [checkedItems, setCheckedItems] = useState(
    labels.reduce((acc, label) => ({ ...acc, [label]: false }), {})
  );

  const handleCheckboxChange = (name) => {
    if (name === '전체') {
      const allChecked = !checkedItems['전체'];
      const updatedCheckedItems = labels.reduce((acc, label) => {
        acc[label] = allChecked; // 전체를 선택하면 모든 항목 체크
        return acc;
      }, {});
      setCheckedItems(updatedCheckedItems);
      onChange(updatedCheckedItems); // 모든 항목의 상태를 부모에게 전달
    } else {
      setCheckedItems((prev) => {
        const newCheckedItems = { ...prev, [name]: !prev[name] }; // 선택한 항목의 상태 반전
        const allSelected = labels.slice(1).every((label) => newCheckedItems[label]); // "전체" 체크 상태 결정
        newCheckedItems['전체'] = allSelected; // 전체 항목 체크 상태 업데이트
        onChange(newCheckedItems); // 변경된 체크 상태를 부모에게 전달
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
