

1、下载资源 html/m4a

```python
def download_resource():
	pass
```

2、运行 通用模块.ipynb 获得结构化数据
```python

def get_structure_data(class_id, res_path):
	"""
		class_id 表示课程 id，从数据库中查询得到
		res_path 表示资源存放路径，比如 domain.com/dedao/resource/wu|xiong 等
	"""

	pass
```

3、插入数据库中

```python
def insert_into_db():
	'load data local infile \'iget_lesson.csv\' into table iget_lesson character set utf8 fields terminated by \',\' (lesson_id, class_id, lesson_name, lesson_text_url, lesson_audio_url, lesson_order, lesson_title);'
	pass
```

4、执行替换操作，去掉微信众筹等
```shell
replace_all.sh .
```

5、上传资源到服务器

```shell
# 压缩
zip res.zip res

# 上传到服务器
scp res.zip root@47.98.186.107:/

# 解压
unzip -O cp936 a.zip
```