import { FC, ReactNode } from 'react';
import { Box, Checkbox, MenuItem } from '@mui/material';

import { Select } from 'tg.component/common/form/fields/Select';
import { components } from 'tg.service/apiSchema.generated';
import { FieldLabel } from 'tg.component/FormField';
import { useTranslate } from '@tolgee/react';

export const UseNamespacesCheckbox: FC<{
  label?: ReactNode;
  name: string;
}> = (props) => {
  return (
    <Box>
      <FieldLabel>{props.label}</FieldLabel>
      <Checkbox
        data-cy="default-namespace-select"
        sx={{ mt: 0 }}
        name={props.name}
        size="small"
      />
    </Box>
  );
};
