module.exports = (plop) => {
  function generateTemplateConfig(entityType) {
    const srcFolder = '../src';
    const entityTypeFolder = {
      component: 'components',
      template: 'templates',
    };

    return {
      description: `Generate a new ${entityType}`,
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: `Enter ${entityType} name:`,
        },
        {
          type: 'confirm',
          name: 'generateTest',
          message: 'Do you want to generate a test file?',
          default: true,
        },
      ],
      actions: (data) => {
        let actions = [];

        actions = [
          {
            type: 'add',
            path: `${srcFolder}/${entityTypeFolder[entityType]}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
            templateFile: 'templates/component/component.tsx.hbs',
          },
          {
            type: 'add',
            path: `${srcFolder}/${entityTypeFolder[entityType]}/{{pascalCase name}}/{{pascalCase name}}.styles.ts`,
            templateFile: 'templates/component/component.styles.ts.hbs',
          },
        ];

        if (data.generateTest) {
          actions.push({
            type: 'add',
            path: `${srcFolder}/${entityTypeFolder[entityType]}/{{pascalCase name}}/{{pascalCase name}}.spec.tsx`,
            templateFile: 'templates/component/component.spec.tsx.hbs',
          });
        }

        return actions;
      },
    };
  }

  function generateHook() {
    const hookFolder = '../src/hooks';

    return {
      description: `Generate a new hook`,
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: `Enter your hook name:`,
        },
      ],
      actions: () => {
        let actions = [];

        actions = [
          {
            type: 'add',
            path: `${hookFolder}/use{{pascalCase name}}/use{{pascalCase name}}.ts`,
            templateFile: 'templates/hook/hook.ts.hbs',
          },
        ];

        return actions;
      },
    };
  }
  plop.setGenerator('component', generateTemplateConfig('component'));
  plop.setGenerator('template', generateTemplateConfig('template'));
  plop.setGenerator('hook', generateHook());
  //plop.setGenerator('icon', generateIconConfig('icon'))
};
