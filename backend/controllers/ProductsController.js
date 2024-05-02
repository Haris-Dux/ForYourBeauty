import { ProductsModel } from "../models/Products.Model.js";
import { deleteImageFromFirebase, uploadImageToFirebase } from "../utils/Firebase.js";
import { setMongoose } from "../utils/Mongoose.js";

export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      sale_price,
      stock,
      category,
      subCategory,
      latest,
    } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !image ||
      !category ||
      !subCategory
    )
      throw new Error("Please provide all required fields");
    if (price <= 0 && stock <= 0) {
      throw new Error("Value must be greater then 0");
    }
    if (sale_price && sale_price <= 0) {
      throw new Error("Value must be greater then 0");
    }
    const file = req.file;
    if (!file) throw new Error("Please provide a file");
    const result = await uploadImageToFirebase(file, "FYB Images");
    const imageData = {
      downloadURL: result.downloadURL,
      name: result.name,
      type: result.type,
    };
    await ProductsModel.create({
      name,
      description,
      price,
      stock,
      image: imageData,
      category,
      subCategory,
      sale_price,
      latest,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      productId,
      name,
      description,
      price,
      sale_price,
      stock,
      category,
      subCategory,
      latest,
    } = req.body;
    const product = await ProductsModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    };
    let updateQuery = {};
    if (name) {
      updateQuery = { ...updateQuery, name };
    }
    if (description) {
      updateQuery = { ...updateQuery, description };
    }
    if (price && price > 0) {
      updateQuery = { ...updateQuery, price };
    } else {
      throw new Error("price must be greater then 0");
    }
    if (sale_price && sale_price > 0) {
      updateQuery = { ...updateQuery, sale_price };
    } else {
      throw new Error("sale_price must be greater then 0");
    }
    if (stock && stock > 0) {
      updateQuery = { ...updateQuery, stock };
    } else {
      throw new Error("stock value must be greater then 0");
    }
    if (category) {
      updateQuery = { ...updateQuery, category };
    }
    if (subCategory) {
      updateQuery = { ...updateQuery, subCategory };
    }
    if (latest) {
      updateQuery = { ...updateQuery, latest };
    }
    const file = req.file;
    let imageData = {};
    if (file) {
      const result = await uploadImageToFirebase(file, "FYB Images");
      imageData = {
        downloadURL: result.downloadURL,
        name: result.name,
        type: result.type,
      };
      if(imageData.downloadURL && product.image.downloadURL){
        await deleteImageFromFirebase(product.image.downloadURL)
      }
      updateQuery = { ...updateQuery, imageData };
    }
    if (Object.keys(updateQuery).length === 0)
      throw new Error("No fileds Updated");
    await ProductsModel.findByIdAndUpdate({ _id: productId }, updateQuery);
    return res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.body;
    if (!productId) throw new Error("Product Id not Found");
    const product = await ProductsModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    };
    await deleteImageFromFirebase(product.image.downloadURL);
    await ProductsModel.findByIdAndDelete({ _id: productId });
    return res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLatestPRoducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.aggregate([
      { $match: { latest: true } },
      { $sample: { size: 12 } },
    ]);
    setMongoose();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 5;
    const products = await ProductsModel.find({ latest: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await ProductsModel.find({ latest: false }).countDocuments();
    setMongoose();
    return res
      .status(200)
      .json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
