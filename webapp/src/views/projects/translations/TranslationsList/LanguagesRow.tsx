import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

import { components } from 'tg.service/apiSchema.generated';
import { CellContent, CellPlain, CellControls } from '../CellBase';
import { CircledLanguageIcon } from '../CircledLanguageIcon';
import { useEditableRow } from '../useEditableRow';
import { Editor } from 'tg.component/editor/Editor';
import { TranslationVisual } from '../TranslationVisual';

type LanguageModel = components['schemas']['LanguageModel'];
type KeyWithTranslationsModel =
  components['schemas']['KeyWithTranslationsModel'];

const useStyles = makeStyles((theme) => {
  const borderColor = theme.palette.grey[200];
  return {
    content: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
    },
    languages: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '50%',
      width: '50%',
      flexGrow: 1,
      overflow: 'hidden',
    },
    editor: {
      display: 'flex',
      flexBasis: '50%',
      width: '50%',
      flexGrow: 1,
      justifyContent: 'stretch',
      border: `1px solid ${borderColor}`,
      borderWidth: '0px 0px 0px 1px',
    },
    rowContent: {
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
      alignItems: 'flex-start',
    },
    languageContent: {
      width: 100,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: 4,
      },
    },
    translation: {
      overflow: 'hidden',
    },
    controls: {
      display: 'none',
    },
  };
});

type Props = {
  languages: LanguageModel[];
  data: KeyWithTranslationsModel;
  editEnabled: boolean;
  width: number;
};

export const LanguagesRow: React.FC<Props> = React.memo(function Cell({
  languages,
  data,
  editEnabled,
}) {
  const classes = useStyles();

  const { editVal, value, setValue, handleEdit, handleEditCancel, handleSave } =
    useEditableRow({
      keyId: data.keyId,
      keyName: data.keyName,
      translations: data.translations,
      language: null,
    });

  return (
    <div className={classes.content}>
      <div className={classes.languages}>
        {languages.map((l) => {
          const langIsEditing = l.tag === editVal?.language;
          return (
            <CellPlain
              key={l.id}
              hover={!langIsEditing}
              background={langIsEditing ? '#efefef' : undefined}
              onClick={editEnabled ? () => handleEdit(l.tag) : undefined}
              flexGrow={1}
            >
              <CellContent>
                <div className={classes.rowContent}>
                  <div className={classes.languageContent}>
                    <CircledLanguageIcon flag={l.flagEmoji} />
                    <Box>{l.tag}</Box>
                  </div>
                  <div className={classes.translation}>
                    <TranslationVisual
                      locale={l.tag}
                      maxLines={langIsEditing ? undefined : 3}
                      text={
                        langIsEditing ? value : data.translations[l.tag]?.text
                      }
                      wrapVariants={!langIsEditing}
                    />
                  </div>
                </div>
              </CellContent>
              <CellControls
                mode="view"
                editEnabled={editEnabled}
                onEdit={() => handleEdit(l.tag)}
                absolute
              />
            </CellPlain>
          );
        })}
      </div>
      {editVal?.language && (
        <div className={classes.editor}>
          <CellPlain>
            <CellContent>
              <Editor
                key={editVal.language}
                initialValue={value}
                onChange={(v) => setValue(v as string)}
                onSave={() => handleSave('DOWN')}
                onCancel={handleEditCancel}
              />
            </CellContent>
            <CellControls
              mode="edit"
              onSave={handleSave}
              onCancel={handleEditCancel}
            />
          </CellPlain>
        </div>
      )}
    </div>
  );
});