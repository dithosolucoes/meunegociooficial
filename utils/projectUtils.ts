import { Project, ProjectBlock } from '../types';

const BLOCK_SIZE = 100;

export const groupProjectsIntoBlocks = (projects: Project[]): ProjectBlock[] => {
  if (!projects.length) {
    return [];
  }

  const blocks: ProjectBlock[] = [];
  let blockCounter = 1;
  for (let i = 0; i < projects.length; i += BLOCK_SIZE) {
    const blockProjects = projects.slice(i, i + BLOCK_SIZE);
    blocks.push({
      id: `block-${blockCounter}`,
      name: `Bloco #${String(blockCounter).padStart(3, '0')}`,
      projects: blockProjects,
    });
    blockCounter++;
  }
  return blocks;
};