import React, { useState, useEffect } from 'react';
import { Checkbox, Box, Typography } from '@mui/material';

function CheckBoxGroup({ labels, onChange, value }) {
  const [checkedItems, setCheckedItems] = useState({});

  // 부모에서 전달받은 `value`에 따라 체크 상태 초기화
  useEffect(() => {
    const initialChecked = labels.reduce((acc, label) => ({
      ...acc,
      [label]: value.includes(label),  // value 배열에 해당하는 항목은 true, 나머지는 false
    }), {});
    setCheckedItems(initialChecked);
  }, [value, labels]);  // labels와 value가 바뀔 때마다 체크 상태 초기화

  const handleCheckboxChange = (label) => {
    const newCheckedItems = { ...checkedItems, [label]: !checkedItems[label] };

    // "전체" 체크박스를 위한 로직
    if (label === '전체') {
      const allChecked = !checkedItems['전체'];
      const updatedCheckedItems = labels.reduce((acc, lbl) => {
        acc[lbl] = allChecked;  // 모든 항목을 전체 선택 상태로 업데이트
        return acc;
      }, {});
      setCheckedItems(updatedCheckedItems);
      onChange(updatedCheckedItems);  // 상태 변경 후 부모에게 전달
    } else {
      setCheckedItems(newCheckedItems);
      onChange(newCheckedItems);  // 상태 변경 후 부모에게 전달
    }
  };

  return (
    <Box mt={2} display="flex" flexWrap="wrap" gap="5px">
      {labels.map((label) => (
        <Box key={label} display="flex" alignItems="center" gap="5px" width="48%">
          <Checkbox
            size="small"
            checked={checkedItems[label] || false}  // 기본값 false로 처리
            onChange={() => handleCheckboxChange(label)}  // 클릭 시 상태 변경
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
