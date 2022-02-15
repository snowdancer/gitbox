// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';

module.exports = (robot) => {
  robot.respond(/(.*)/, (res) => {
    res.send(`Your message is ${res.match[1]}`);
  });

  robot.respond('stamp', (res) => {
    res.send(`${res.json.stamp_set} - ${res.json.stamp_index}`);
  });

  robot.respond('yesno', (res) => {
    if (res.json.response === null) {
      res.send(`Your question is ${res.json.question}.`);
    } else {
      res.send(`Your answer is ${res.json.response}.`);
    }
  });

  robot.respond('yesno', (res) => {
    res.send({
      in_reply_to: res.message.id,
      response: true
    });
  });

  robot.respond('select', (res) => {
    if (res.json.response === null) {
      res.send(`Your question is ${res.json.question}.`);
    } else {
      res.send(`Your answer is ${res.json.options[res.json.response]}.`);
    }
  });

  robot.respond('select', (res) => {
    res.send({
      in_reply_to: res.message.id,
      response: 0
    });
  });

  robot.respond('task', (res) => {
    if (res.json.done === null) {
      res.send(`Your task is ${res.json.title}.`);
    } else {
      res.send(`Your task is ${ res.json.done ? 'done' : 'undone' }.`);
    }
  });

  robot.respond('task', (res) => {
    res.send({
      in_reply_to: res.message.id,
      done: true
    });
  });

  robot.respond(/choose$/i, (res) => {
    res.send({
      question: '質問内容',
      options: ['選択肢1', '選択肢2', '選択肢3'],
      closing_type: 1  // (Option) 誰かが回答:0, 全員が回答:1
    });
  });

  robot.respond('map', (res) => {
    res.send(`Your location is ${res.json.place} at ${res.json.lat}, ${res.json.lng}`);
  });

  robot.respond(/photo$/i, (res) => {
    res.send({
      path: '/Users/zhangchunxue/desktop/kirby.png',
      name: 'kirby.png',    // (Option) アップロード名
      type: 'image/png',   // (Option) MIME
      text: 'send file',   // (Option) ファイルと同時に送信するテキスト
    });
  });

  const onfile = (res, file) => {
    res.send([
      'File received.',
      `name: ${file.name}`,
      `type: ${file.content_type}`,
      `size: ${file.content_size}bytes`,
    ].join('\n'));
    res.download(file, (path) => {
      res.send(`downloaded to ${path}`);
    });
  };
  
  // ファイルが1つだけの場合
  robot.respond('file', (res) => {
    onfile(res, res.json);
  });
  
  // ファイルが複数の場合
  robot.respond('files', (res) => {
    for (const file of res.json.files) {
      onfile(res, file);
      if (res.json.text) {
        res.send(`with text: ${res.json.text}`);
      }
    }
  });

  // ノートが作成された
robot.respond('note_created', (res) => {
  const j = res.json;
  console.log(`created: id = ${j.note_id}, title = ${j.title}`);
});

// ノートが更新された
robot.respond('note_updated', (res) => {
  const j = res.json;
  console.log(`updated: id = ${j.note_id}, title = ${j.title}`);
});

// ノートが削除された
robot.respond('note_deleted', (res) => {
  const j = res.json;
  console.log(`deleted: id = ${j.note_id}, title = ${j.title}`);
});

};
