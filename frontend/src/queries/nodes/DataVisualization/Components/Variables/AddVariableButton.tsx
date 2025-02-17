import { IconPlus } from '@posthog/icons'
import { LemonButton, LemonMenu } from '@posthog/lemon-ui'
import { useActions, useValues } from 'kea'
import { FEATURE_FLAGS } from 'lib/constants'
import { featureFlagLogic } from 'lib/logic/featureFlagLogic'

import { dataVisualizationLogic } from '../../dataVisualizationLogic'
import { NewVariableModal } from './NewVariableModal'
import { variableModalLogic } from './variableModalLogic'
import { variablesLogic } from './variablesLogic'

export const AddVariableButton = (): JSX.Element => {
    const { showEditingUI } = useValues(dataVisualizationLogic)
    const { featureFlags } = useValues(featureFlagLogic)
    const { openNewVariableModal } = useActions(variableModalLogic)

    const { variables, variablesLoading } = useValues(variablesLogic)
    const { addVariable } = useActions(variablesLogic)

    if (!featureFlags[FEATURE_FLAGS.INSIGHT_VARIABLES] || !showEditingUI) {
        return <></>
    }

    return (
        <>
            <LemonMenu
                items={[
                    {
                        title: 'New variable',
                        items: [
                            {
                                label: 'String',
                                onClick: () => openNewVariableModal('String'),
                            },
                            {
                                label: 'Number',
                                onClick: () => openNewVariableModal('Number'),
                            },
                            {
                                label: 'Boolean',
                                onClick: () => openNewVariableModal('Boolean'),
                            },
                            {
                                label: 'List',
                                onClick: () => openNewVariableModal('List'),
                            },
                            {
                                label: 'Date',
                                onClick: () => openNewVariableModal('Date'),
                            },
                        ],
                    },
                    {
                        label: 'Existing variable',
                        items: variablesLoading
                            ? [
                                  {
                                      label: 'Loading...',
                                      onClick: () => {},
                                  },
                              ]
                            : variables.map((n) => ({
                                  label: (
                                      <span className="flex items-center gap-2">
                                          <span>{n.name}</span>
                                          <span className="text-xs text-muted-alt">{n.type}</span>
                                      </span>
                                  ),
                                  onClick: () => addVariable({ variableId: n.id, code_name: n.code_name }),
                              })),
                    },
                ]}
            >
                <LemonButton type="secondary" sideIcon={<IconPlus />}>
                    Add variable
                </LemonButton>
            </LemonMenu>
            <NewVariableModal />
        </>
    )
}
