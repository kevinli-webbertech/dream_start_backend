module.exports = {
  apps: [
    {
      name: "dream-cms",
      cwd: "/home/ubuntu/dream_cms",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        DATABASE_HOST: "cms-db.cc69hvvdc5ld.us-east-2.rds.amazonaws.com",
        DATABASE_PORT: "5432",
        DATABASE_NAME: "postgres",
        DATABASE_USERNAME: "postgres",
        DATABASE_PASSWORD: "postgres",
        AWS_ACCESS_KEY_ID: "AKIAWZNJHOW76HTEM2AV",
        AWS_SECRET_ACCESS_KEY: "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",
        AWS_REGION: "us-east-2",
        AWS_BUCKET_NAME: "dream-cms",
      },
    },
  ],
};
