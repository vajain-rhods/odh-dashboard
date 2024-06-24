import React from 'react';
import { Label, Split, SplitItem, Truncate } from '@patternfly/react-core';
import { PipelineRunKFv2, StorageStateKF } from '~/concepts/pipelines/kfTypes';
import { computeRunStatus } from '~/concepts/pipelines/content/utils';
import PipelineRunTypeLabel from '~/concepts/pipelines/content/PipelineRunTypeLabel';

type RunJobTitleProps = {
  run: PipelineRunKFv2;
  statusIcon?: boolean;
  pipelineRunLabel?: boolean;
};

const PipelineDetailsTitle: React.FC<RunJobTitleProps> = ({
  run,
  statusIcon,
  pipelineRunLabel,
}) => {
  const { icon, label, color } = computeRunStatus(run);

  const isArchived = run.storage_state === StorageStateKF.ARCHIVED;

  return (
    <>
      <Split hasGutter>
        <SplitItem>
          {/* TODO: Remove the custom className after upgrading to PFv6 */}
          <Truncate content={run.display_name} className="truncate-no-min-width" />
        </SplitItem>
        {pipelineRunLabel && (
          <SplitItem>
            <PipelineRunTypeLabel run={run} />
          </SplitItem>
        )}
        {statusIcon && (
          <SplitItem>
            <Label color={color} icon={icon}>
              {label}
            </Label>
          </SplitItem>
        )}
        {isArchived && (
          <SplitItem>
            <Label>Archived</Label>
          </SplitItem>
        )}
      </Split>
    </>
  );
};
export default PipelineDetailsTitle;
