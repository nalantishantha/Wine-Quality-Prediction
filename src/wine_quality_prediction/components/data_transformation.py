import os
import pandas as pd
from sklearn.model_selection import train_test_split
from wine_quality_prediction import logger
from wine_quality_prediction.config.configuration import DataTransformationConfig

class DataTransformation:
    def __init__(self, config: DataTransformationConfig):
        self.config = config
        
    def train_test_spliting(self):
        data = pd.read_csv(self.config.data_path)
        
        # split data into training and test sets (0.75, 0.25)
        train, test = train_test_split(data)
        
        train.to_csv(os.path.join(self.config.root_dir, "train.csv"), index = False)
        test.to_csv(os.path.join(self.config.root_dir, "test.csv"), index = False)
        
        logger.info("Splitted data into training and test (0.75, 0.25)")
        logger.info(train.shape)
        logger.info(test.shape)
        
        print(train.shape)
        print(test.shape)