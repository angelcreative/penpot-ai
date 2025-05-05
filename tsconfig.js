{
    "compilerOptions": {
      "target": "es2020",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "typeRoots": [
        "./node_modules/@types",
        "./node_modules/@penpot"
      ],
      "types": ["plugin-types"]
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }